.DEFAULT_GOAL := reset
VERCEL_TOKEN := $(shell cat .vercel)
GIT_SHA := $(shell git rev-parse HEAD | cut -c 1-8)

# LOCAL DEVELOPMENT
# Default target is reset which will stop and remove all containers, start them again and seed the database.

nuke:
	docker compose kill
	docker compose rm -f -v

init:
# TODO network-timeout could be necessary for slow connections
	docker compose up -d --wait
	(cd src/api && yarn install --frozen-lockfile --network-timeout 1000000000 && yarn seed)
# TODO add steps for frontend

start:
	docker compose up -d
	(cd src/api && yarn run dev)
# TODO add steps for frontend

stop:
	docker compose down

lint:
	(cd src/api && yarn lint && yarn tsc)
# TODO add steps for frontend

reset: nuke init start

test:
# TODO network-timeout could be necessary for slow connections
	(cd src/api && yarn install --frozen-lockfile --network-timeout 1000000000 && yarn test && yarn test:coverage)


# DEPLOYMENT

deploy-stage:
# TODO add deploy procedures. This could be specified in CICD pipeline
# or CICD can use this makefile but this will require more precise instructions dependend on the environment
# We can include GIT_SHA in the deployment to track the version of the code deployed
	@echo "Deploying ${GIT_SHA} to stage"
# Example usage of simple vercel CLI deployment
	(cd src/api && vercel pull --yes --environment=production --token=${VERCEL_TOKEN} && vercel build --prod --token=${VERCEL_TOKEN} &&  vercel deploy --prebuilt --prod --token=${VERCEL_TOKEN})

deploy-production:
# TODO add deploy procedures. This could have more steps than stage deployment.
# For example, it could include a manual approval step or use a different deployment strategy.
# It could also use a different GIT branch or tag depends on needs.
	@echo "Deploying ${GIT_SHA} to production"
