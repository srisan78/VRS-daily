pipeline {
    agent any

    environment {
        REGISTRY = 'docker.io'
        IMAGE_NAME = 'sridhar76/vrs_daily'
        DOCKER_HUB_VARS = credentials('docker-hub-creds')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/srisan78/VRS-daily.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
               sh 'npm test || echo "Tests failed or no test script defined"'
            }
        }

        stage('Docker Build') {
            steps {
               sh "docker build -t sridhar76/vrs_daily:${BUILD_NUMBER} ."
            }
        }

        stage('Push Image') {
            steps {
                sh "echo ${DOCKER_HUB_VARS_PSW} | docker login -u ${DOCKER_HUB_VARS_USR} --password-stdin"
                sh 'docker push sridhar76/vrs_daily:$BUILD_NUMBER'
            }
        }
    }
}
