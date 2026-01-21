
#!/usr/bin/env bash
set -euo pipefail

TIMESTAMP=$(date +"%Y%m%dT%H%M%S")
BACKUP_DIR="${BACKUP_DIR:-./backups}"
MONGO_URI="${MONGO_URI:-}"

if [ -z "$MONGO_URI" ]; then
  echo "MONGO_URI is required. Example:"
  echo "MONGO_URI='mongodb://localhost:27017/isote-ecommerce' ./scripts/mongo-backup.sh"
  exit 2
fi

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/mongo-backup-$TIMESTAMP"
echo "Creating mongodump to $OUT"
mongodump --uri="$MONGO_URI" --out="$OUT"

KEEP=${KEEP:-7}
echo "Rotating backups, keeping last $KEEP"
ls -1dt "$BACKUP_DIR"/mongo-backup-* | tail -n +$((KEEP+1)) | xargs -r rm -rf

echo "Backup completed: $OUT"

