FROM node:4-onbuild

ENV NODE_ENV production

CMD ["npm", "build"]
