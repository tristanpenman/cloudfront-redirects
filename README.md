# Website Redirects

This repo contains an Edge Lambda function that transforms CloudFront Viewer Requests to work with my blog.

## Redirects

Redirection rules are applied in the following order:

1. Redirects URLs of the form `http(s)://www.tristanpenman.com(/)` to `https://tristanpenman.com`
2. Redirects URLs of the form `http(s)://tristanpenman.com(/)` -> `https://tristanpenman.com/blog/`. All content lives under `/blog`.
3. URLs that end with `/` are fulfilled by loading `index.html` in that location
4. URLs that end with `/index.html` are canonicalised to `/`. This will cause rule 3 to be invoked after redirect.
5. All other URLs are canonicalised to end with `/`.

## License

You are free to do whatever you like with this code.
