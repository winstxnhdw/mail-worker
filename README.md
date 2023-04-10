# mail-worker

[![main.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml)

`mail-worker` is a [Cloudflare Worker](https://workers.cloudflare.com/) that send emails using [AWS SES](https://aws.amazon.com/ses/).

## Deploy

Deploy to Cloudflare Workers with the following.

```bash
yarn deploy
```

## Verify Email

To use any sender email, the email must first be verified. The verification will require the following environment variables. You may populate your environment with the following.

```bash
echo AWS_REGION=$AWS_REGION >> .env
echo AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID >> .env
echo AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY >> .env
```

Now, pipe your email as stdin to the `verify-email` script.

```bash
echo $EMAIL_ADDRESS | yarn verify-email
```
