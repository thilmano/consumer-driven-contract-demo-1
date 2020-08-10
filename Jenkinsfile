pipeline {
    agent any
    stages {
        stage('Run Consumer Test to Genereate PACTs') {
            steps {
                bat 'npm run test:consumer'
            }
        }
        stage('Publish PACTs to PactBroker') {
            steps {
                bat 'npm run test:publish'
            }
        }
        stage('Run Provider Test against PACTs') {
            steps {
                bat 'npm run test:provider'
            }
        }
    }
}
