#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/shakespeares_world'
  def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)
    newImage.inside {
      sh 'npm install'
    }
  }

  stage('Deploy') {
    if (BRANCH_NAME == 'alpha') {
      newImage.inside {
        sh 'export BUCKET="zooniverse-static"; export PREFIX="preview.zooniverse.org/folgerdemo/"; export BASE_URL="https://preview.zooniverse.org/folgerdemo"; npm run build && npm run deploy'
      }
    }

    if (BRANCH_NAME == 'staging') {
      newImage.inside {
        sh 'export BUCKET="zooniverse-static"; export PREFIX="preview.zooniverse.org/shakespearesworld/"; export BASE_URL="https://preview.zooniverse.org/shakespearesworld"; npm run build && npm run deploy'
      }
    // }

    if (BRANCH_NAME == 'master') {
      newImage.inside {
        sh 'export BUCKET="zooniverse-static"; export PREFIX="www.shakespearesworld.org/"; export BASE_URL="https://www.shakespearesworld.org"; npm run build && npm run deploy'
      }
    }
  }
}
