#!/bin/sh
openssl aes-256-cbc -K $encrypted_fb5b1cb555a2_key -iv $encrypted_fb5b1cb555a2_iv -in ./.env.production.enc -out ./.env.production -d
rsync -r --quiet --delete-after . $DEPLOY_USER@$DEPLOY_HOST:/home/$DEPLOY_USER/api.privacyrequests.org
ssh $DEPLOY_USER@$DEPLOY_HOST <<'ENDSSH'
export RAILS_ENV=production
cd api.privacyrequests.org
bundle
bundle exec rails db:migrate
supervisorctl restart api-server-daemon
ENDSSH