# Generate 64 random bytes for jwt secret

```
node -e "console.log(require('crypto').randomBytes(64).toString('base64url'));"
```
