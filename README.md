# mail-worker

[![main.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml)
[![deploy.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/deploy.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/deploy.yml)
[![formatter.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/formatter.yml)

`mail-worker` is a robust [Cloudflare Worker](https://workers.cloudflare.com/) built for sending emails with [AWS SES](https://aws.amazon.com/ses/) and [Bun](https://github.com/oven-sh/bun).

## Development

Install all dependencies.

```bash
bun install
```

## Usage

`POST` **`/`** `(send email to recipient(s))`

### Request Headers

> | name          |  type    | description                       |
> | ------------- | -------- | --------------------------------- |
> | Authorization | optional | `AUTH_TOKEN` environment variable |

### Parameters

> | name        |  type    | data type      | description                   |
> | ----------- | -------- | ---------------| ----------------------------- |
> | from        | required | `string`       | sender's email address        |
> | to          | required | `string[]`     | recipient's email address(es) |
> | cc          | optional | `string[]`     | cc recipient's email address  |
> | bcc         | optional | `string[]`     | bcc recipient's email address |
> | subject     | optional | `string`       | email subject                 |
> | html        | optional | `string`       | email content                 |
> | attachments | optional | `Attachment[]` | email attachments             |

### Responses

> | http code | content-type | reason                                                               |
> | --------- | ------------ | -------------------------------------------------------------------- |
> | `200`     | `text/plain` | email sent successfully                                              |
> | `400`     | `text/plain` | invalid request body                                                 |
> | `401`     | `text/plain` | invalid authentication token                                         |
> | `500`     | `text/plain` | AWS SES is unavailable/setup incorrectly or the sender is unverified |

### Example cURL

> ```bash
> curl $MAIL_WORKER_ENDPOINT -H "Content-Type: application/json" -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test"
>  }'
> ```

### Example cURL with Attachment(s)

> ```bash
> curl $MAIL_WORKER_ENDPOINT -H "Content-Type: application/json" -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test",
>    "attachments": [{"name": "text.txt", "type": "text/plain", "content": "SGVsbG8gV29ybGQ="}]
>  }'
> ```

### Example cURL with Authentication

> ```bash
> curl $MAIL_WORKER_ENDPOINT \
>   -H "Authorization: $AUTH_TOKEN" \
>   -H "Content-Type: application/json" -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test"
>  }'
> ```

## Setup

### Environment

Your worker must have the following environment variables.

```bash
echo $AWS_REGION | npx wrangler secret put AWS_REGION
echo $AWS_ACCESS_KEY_ID | npx wrangler secret put AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY | npx wrangler secret put AWS_SECRET_ACCESS_KEY
```

### Authentication

Optionally, you may secure your endpoint by setting the following environment variable.

```bash
echo $AUTH_TOKEN | npx wrangler secret put AUTH_TOKEN
```

## Verify Email

To use any sender email, the email must first be verified. The verification will require the following environment variables. You may populate your environment with the following.

```bash
{
  echo "AWS_REGION=$AWS_REGION"
  echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"
} > .env
```

Now, pipe your email to the `verify-email` script.

```bash
echo $EMAIL_ADDRESS | bun verify-email
```
