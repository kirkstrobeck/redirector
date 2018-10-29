# Redirector

Handle redirects with AWS API Gateway and Lambdas

```sh
# install deps
yarn

# test locally -- update test/* files to test
yarn invoke-local

# deploy
# IMPORTANT: change bucket name in serverless.yml first
yarn deploy

# create json
cp test/redirects.json redirects.json

# get aws on your command line
brew install awscli

# upload to your new s3 bucket
aws s3 cp redirects.json s3://redirector-111222333 # change name

# invoke deployed with test payload
yarn invoke

# check logs
yarn logs
```
