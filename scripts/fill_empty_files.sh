#!/usr/bin/env bash
# fill_empty_files.sh
# Scans repository for empty or whitespace-only files and fills them with safe placeholders
# Also detects files containing only "$*" (malformed generator output)
# Always creates .bak backups before modifying files

set -euo pipefail

# Only process files smaller than this size (in bytes)
MAX_SIZE=10

echo "Scanning for empty, whitespace-only, or malformed files..."

# Find all files (excluding .git, node_modules, etc.)
find . -type f \
  -not -path "./.git/*" \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" \
  -not -path "*/.next/*" \
  -not -path "*/coverage/*" \
  -not -path "*/.bak" \
  -not -name "*.bak" \
  -size -${MAX_SIZE}c | while read -r file; do
  
  # Read the file content and strip whitespace
  content=$(cat "$file")
  stripped=$(echo "$content" | tr -d '[:space:]')
  
  # Check if file is empty, whitespace-only, or contains just "$*"
  if [ ! -s "$file" ] || [ -z "$stripped" ] || [ "$stripped" = "\$*" ]; then
    echo "Found empty/whitespace-only/malformed file: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    echo "  Created backup: $file.bak"
    
    # Determine file type and write appropriate content
    case "$file" in
      *.jsx)
        echo "// Placeholder - TODO: implement" > "$file"
        echo "  Filled with JSX placeholder"
        ;;
      *.css)
        echo "/* Placeholder - TODO: add styles */" > "$file"
        echo "  Filled with CSS placeholder"
        ;;
      *.js)
        echo "// Placeholder - TODO: implement" > "$file"
        echo "  Filled with JS placeholder"
        ;;
      *.json)
        if [[ "$file" == *"package.json" ]]; then
          cat > "$file" <<'EOF'
{
  "name": "placeholder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "test": "echo \"No tests configured\" && exit 0"
  }
}
EOF
          echo "  Filled with package.json template"
        else
          echo "{}" > "$file"
          echo "  Filled with empty JSON object"
        fi
        ;;
      *.yml|*.yaml)
        echo "# Placeholder - TODO: configure" > "$file"
        echo "  Filled with YAML placeholder"
        ;;
      *Dockerfile*)
        cat > "$file" <<'EOF'
# Placeholder Dockerfile
FROM node:18-alpine
WORKDIR /app
CMD ["echo", "Dockerfile not configured"]
EOF
        echo "  Filled with Dockerfile placeholder"
        ;;
      *.env|*.env.*)
        cat > "$file" <<'EOF'
# Environment variables - TODO: configure
# NODE_ENV=development
# PORT=3000
EOF
        echo "  Filled with .env template"
        ;;
      *.md)
        basename=$(basename "$file" .md)
        echo "# $basename" > "$file"
        echo "" >> "$file"
        echo "TODO: Add documentation" >> "$file"
        echo "  Filled with markdown placeholder"
        ;;
      *.gitignore)
        cat > "$file" <<'EOF'
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment
.env
.env.local
EOF
        echo "  Filled with .gitignore template"
        ;;
      *.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico)
        # For binary files, just skip or remove them
        echo "  Skipping binary image file (should be replaced with actual image)"
        ;;
      *.html)
        echo "<!-- Placeholder - TODO: implement -->" > "$file"
        echo "  Filled with HTML placeholder"
        ;;
      *.sh)
        cat > "$file" <<'EOF'
#!/usr/bin/env bash
# Placeholder script - TODO: implement
echo "Script not implemented yet"
EOF
        chmod +x "$file"
        echo "  Filled with shell script placeholder"
        ;;
      *)
        echo "# Placeholder file" > "$file"
        echo "  Filled with generic placeholder"
        ;;
    esac
  fi
done

echo "Done scanning for empty files."
