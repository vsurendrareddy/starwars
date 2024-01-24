pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/vsurendrareddy/starwars.git']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def npmCommand = isUnix() ? 'npm' : 'npm.cmd'
                    sh "${npmCommand} install"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    def npmCommand = isUnix() ? 'npm' : 'npm.cmd'
                    sh "${npmCommand} run build"
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         script {
        //             // Copy built files to the remote server using SSH
        //             sshagent(['YOUR_SSH_CREDENTIAL_ID']) {
        //                 sh "scp -r -i /path/to/your/private/key ${WORKSPACE}/build/* user@remote-server:/path/to/deployment/directory/"
        //             }
        //         }
        //     }
        // }
    }
}
