FROM node:18.16-bullseye-slim

WORKDIR /hi_exchange_be

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY . ./src
CMD \
    if [ -f package-lock.json ]; then npm run start:debug; \
    elif [ -f yarn.lock ]; then yarn start:dev; \
    fi