#!/usr/bin/env bash
# fill_empty_files.sh
# Scans the repository for empty files and replaces them with sensible placeholders
# based on file extension. Creates .bak backups and is safe to run.
#
# Usage: ./scripts/fill_empty_files.sh

set -euo pipefail

echo "Scanning for empty or malformed files..."

# Function to check if a file is empty or contains only whitespace
is_empty() {
  local file="$1"
  if [ ! -s "$file" ]; then
    return 0  # File is empty (size 0)
  fi
  if [ -z "$(grep -v '^[[:space:]]*$' "$file")" ]; then
    return 0  # File contains only whitespace
  fi
  return 1
}

# Function to fill an empty file with placeholder content
fill_file() {
  local file="$1"
  local extension="${file##*.}"
  local basename=$(basename "$file")
  
  # Create backup
  if [ -f "$file" ]; then
    cp "$file" "${file}.bak"
    echo "  Created backup: ${file}.bak"
  fi
  
  # Determine content based on file type
  case "$basename" in
    package.json)
      cat > "$file" <<'EOF'
{
  "name": "isote-placeholder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "echo 'No dev script configured'",
    "test": "echo 'No tests yet' && exit 0"
  },
  "dependencies": {},
  "devDependencies": {}
}
EOF
      ;;
    Dockerfile)
      cat > "$file" <<'EOF'
# TODO: Configure Dockerfile for this service
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
EOF
      ;;
    .gitignore)
      cat > "$file" <<'EOF'
# Dependencies
node_modules/
npm-debug.log*

# Build output
dist/
build/

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
EOF
      ;;
    *.md)
      cat > "$file" <<EOF
# $(basename "$file" .md | tr '[:lower:]' '[:upper:]')

TODO: Add documentation here.
EOF
      ;;
    *)
      case "$extension" in
        js)
          cat > "$file" <<'EOF'
// TODO: Add implementation here
module.exports = {};
EOF
          ;;
        json)
          echo "{}" > "$file"
          ;;
        yml|yaml)
          cat > "$file" <<'EOF'
# TODO: Add YAML configuration here
version: "1"
EOF
          ;;
        env)
          cat > "$file" <<'EOF'
# Environment variables
# NOTE: This file should not be committed with real secrets
# Add your environment variables here as KEY=value
# Example:
# DATABASE_URL=mongodb://localhost:27017/mydb
# JWT_SECRET=your-secret-here
EOF
          ;;
        *)
          echo "# TODO: Fill this file" > "$file"
          ;;
      esac
      ;;
  esac
  
  echo "  Filled: $file"
}

# Find and process empty files
found_empty=false

# Common directories to scan
for dir in . Backend Frontend scripts .github docs; do
  if [ ! -d "$dir" ]; then
    continue
  fi
  
  # Find all files (excluding .git, node_modules, etc.)
  while IFS= read -r -d '' file; do
    if is_empty "$file"; then
      echo "Found empty file: $file"
      fill_file "$file"
      found_empty=true
    fi
  done < <(find "$dir" -type f \
    ! -path "*/.git/*" \
    ! -path "*/node_modules/*" \
    ! -path "*/dist/*" \
    ! -path "*/build/*" \
    ! -path "*/.bak" \
    -print0 2>/dev/null || true)
done

if [ "$found_empty" = false ]; then
  echo "No empty files found."
else
  echo ""
  echo "Done! Review the filled files and remove .bak backups if satisfied."
  echo "Backups can be removed with: find . -name '*.bak' -delete"
fi
