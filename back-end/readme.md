## Set up back-end:
1. Install pipenv here https://pypi.org/project/pipenv/

2. Run this command after install pipenv (make sure you at the back-end folder in terminal):
    
    $ pipenv install
    
    $ pipenv shell
    
    $ python manage.py makemigrations
    
    $ python manage.py makemigrations todo_list
    
    $ python manage.py migrate
    
    $ python manage.py createsuperuser (follow to step as you will be prompted create an admin account)
    
    $ python manage.py runserver

## Endpoints
### get csrf token
127.0.0.1:8000/csrf/

- Description: this will set cookies contain the csrftoken to user's browser. 

### check authenticate
127.0.0.1:8000/session/

- Description: check if the current user is authenticated
- Return: {'isAuthenticated': result}, result = True if request sent from authenticated user, and False vice versa.

### login
127.0.0.1:8000/login/

Body request
    
    {

        "username": user_name_here,

        "password": password_here

    }

Return

    {
        "detail": "Successfully logged in."
    }

or 

    {
        "detail": "Invalid credential."
    }

### logout
127.0.0.1:8000/logout/

Return

    {
        "detail": "Successfully logged out."
    }

or 

    {
        "detail": "You are not log in."
    }

### get all stickers
127.0.0.1:8000/sticker/get/

Returns all stickers inventory of the user's bar.

Returns 400 if the user is not a bar manager.

    {
        'detail': 'Insufficient privilege.'
    }

### create stickers
127.0.0.1:8000/sticker/create/

Request body:

    {
        "sticker_id": "1234ABCD",
        "drink_name": "drink_name_test1",
        "drink_type": "drink_type_test1",
        "drink_size": "3",
        "price": "80.00"
    }
"bar" gets assigned dynamically to the bar that user manages.

Returns 400 if the sticker fails to create.

    {
        'detail': 'Failed to create new sticker'
    }

### note:
- make sure to include csrftoken in the request's header like so

    "X-CSRFToken": csrf_token_here

- make sure to specify in fetch request

    credential: "include"