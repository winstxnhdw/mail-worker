# mail-worker

[![main.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml)
[![dependabot.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/dependabot.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/dependabot.yml)

`mail-worker` is a [Cloudflare Worker](https://workers.cloudflare.com/) built for sending emails with [AWS SES](https://aws.amazon.com/ses/).

## Development

Install all dependencies.

```bash
yarn
```

## Usage

`POST` **`/`** `(sends email to recipient(s))`

### Parameters

> | name      |  type    | data type               | description                                                           |
> |-----------|----------|-------------------------|-----------------------------------------------------------------------|
> | to        | required | `string[]`              | an array of recipient's email address                                 |
> | from      | required | `string`                | sender's email address                                                |
> | subject   | required | `string`                | email subject                                                         |
> | html      | required | `string`                | email content                                                         |

### Responses

> | http code     | content-type                   | response                                                              |
> |---------------|--------------------------------|-----------------------------------------------------------------------|
> | `200`         | `text/plain`                   | `Email sent!`                                                         |
> | `400`         | `text/plain`                   | `Invalid request!`                                                    |
> | `500`         | `text/plain`                   | `Failed to send email!`                                               |

### Example cURL

> ```bash
> curl $MAIL_WORKER_ENDPOINT -H 'Content-Type: application/json' -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test"
>  }'
> ```

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
