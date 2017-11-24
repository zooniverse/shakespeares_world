FROM node:9-onbuild

ENV NODE_ENV production

CMD ["npm", "build"]
