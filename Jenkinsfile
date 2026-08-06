pipeline {

    agent any

    environment {

        AWS_REGION = 'ap-south-1'
        //ECR_REPO = '943246945615.dkr.ecr.ap-south-1.amazonaws.com/login-app'
        AWS_ACCOUNT_ID = '943246945615'
        ECR_REPO = 'login-app'
        IMAGE_TAG = "${BUILD_NUMBER}"

    }

    stages {

        stage('Checkout') {
            steps {
                //git 'https://github.com/hkrrajat/login-app.git'
                git branch: 'main', url: 'https://github.com/hkrrajat/login-app.git'
            }
        }

       stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
       }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t login-app:${IMAGE_TAG} .'
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-login'
                ]]) {

                    sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login \
                    --username AWS \
                    --password-stdin \
                    $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker tag login-app:${IMAGE_TAG} \
                $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/$ECR_REPO:${IMAGE_TAG}
        
                docker push \
                $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/$ECR_REPO:${IMAGE_TAG}
                '''
            }
        }

    }

}