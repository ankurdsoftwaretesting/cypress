pipeline{
   
   agent any
    
    stages{
        stage("clean WS"){
            steps{
                cleanWs()
            }
        }
        stage("Git checkout"){
            steps{
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/ankurdsoftwaretesting/cypress.git'
            }
        }
        
        stage("npm install"){
            steps{
                sh "npm install"
                
            }
        }
        stage("npm test"){
           steps{
                sh "npm run test"
           }
        }
    }
    post{
      always{
        echo "Ran cypress automation..."
    }
}
