####################################################################
# STAGE: builder
# This stage is used for builds
# See: https://docs.docker.com/develop/develop-images/multistage-build/
####################################################################
FROM node:16-alpine AS builder

# Copy package.json and package-lock.json before rest of source tree. This is an optimization for not busting
# build cache unnecessarily. The rationale is that your dependencies will change less frequently than the
# service code, so split pulling of dependencies into a separate cachable step.
# RUNDIR is set as the workdir by the base image
ADD . ${RUNDIR}/

# Install all node module dependencies
RUN npm ci

RUN npm run build

####################################################################
# STAGE: localdev
# This stage is used for local development
# See: https://docs.docker.com/develop/develop-images/multistage-build/
####################################################################
FROM builder AS localdev

EXPOSE 10001

CMD [ "npm","run", "dev" ]