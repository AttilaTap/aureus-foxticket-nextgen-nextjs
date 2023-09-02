FROM node:18-alpine AS deps

ENV NODE_ENV=production

# or libc6-compat?
RUN apk --no-cache add nginx

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# Build the source code only when needed
FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

CMD ["npm"] ["start"]

#Production image, copy all the files and run next
#FROM node:18-alpine AS runner

#WORKDIR /app

#ENV NODE_ENV=production

#RUN addgroup --system --gid 1001 nextticketgroup 
#RUN adduser --system --uid 1001 nextticketuser 

#COPY --from=builder /app/public ./public
#COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextticketuser:nextticketgroup /app/.next/standalone ./
#COPY --from=builder --chown=nextticketuser:nextticketgroup /app/.next/static ./.next/static

#USER nextticketuser

#EXPOSE 8080

#ENV PORT 8080

#CMD ["node", "server.js"]

#Update the file next.config.js to allow standalone output