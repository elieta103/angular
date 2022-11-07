# 12AuthApp

Integrar el back con front ,  agregar en:  app-routing.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

Generar el  build de production :
(Versiones viejas)  ng build --prod
( Version actual )  ng build --configuration production

Copiar front(build) en back(public).




INSTALL HEROKU CLI
Download and install the Heroku CLI.
If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
$ heroku login

CREATE A NEW GIT REPOSITORY
Initialize a git repository in a new or existing directory
$ cd my-project/
$ git init
$ heroku git:remote -a app-angular-mean

DEPLOY YOUR APPLICATION
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
You can now change your main deploy branch from "master" to "main" for both manual and automatic deploys, please follow the instructions here.
Existing Git repository
For existing repositories, simply add the heroku remote

$ heroku git:remote -a app-angular-mean
