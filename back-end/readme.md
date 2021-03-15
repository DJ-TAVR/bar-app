## Set up back-end: (first time)
1. Install pipenv here https://pypi.org/project/pipenv/

2. Run below commands after install pipenv (make sure you at the back-end folder in terminal):
    
    $ pipenv install
    
    $ pipenv shell
    
    $ python manage.py makemigrations
    
    $ python manage.py migrate
    
    $ python manage.py createsuperuser (follow to step as you will be prompted create an admin account)
    
## How to run server
Run below commands (make sure you at the back-end folder in terminal):
    $ pipenv shell
    $ python manage.py runserver

## Endpoints
### note:
- make sure to include csrftoken in the header of fetch request:

    "X-CSRFToken": csrf_token_here

- make sure to specify in the header of fetch request:

    credential: "include"

### HTTP status code:
200: success

403: forbidden (don't have permission)

405: method not allowed

500: internal server error

### get csrf token
127.0.0.1:8000/csrf/

- Description: this will set cookies contain the csrftoken in user's browser. 

### check authenticate
127.0.0.1:8000/account/session/

- Description: check if the current user is authenticated
- Return: {'isAuthenticated': result}, result = True if request sent from authenticated user, and False vice versa.

### login
127.0.0.1:8000/account/login/

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

if HTTP_STATUS != 200: check for error message

### get all stickers
method GET
127.0.0.1:8000/sticker/get

Return
    {
        [
            {
                "sticker_id": "sample_id",
                "drink_name": "sample drink name",
                "drink_type": "sample drink type",
                "drink size": 12,
                "price": 99.00
            }, 
            {
                ... (second sticker here)
            }
        ]
    }
    
if HTTP_STATUS != 200: check for error message

# create sticker
method POST
127.0.0.1:8000/sticker/create

Request body
    {
        {
            "sticker_id": "sample_id",
            "drink_name": "sample drink name",
            "drink_type": "sample drink type",
            "drink size": 12,
            "price": 99.00
        }
    }

if HTTP STATUS != 200, fail to create sticker

# delete sticker
method POST
127.0.0.1:8000/sticker/delete

Request body
{
    "sticker_id": "sample sticker id"
}

if HTTP STATUS != 200, fail to delete sticker

# update sticker
method PUT
127.0.0.1:8000/sticker/update

Request body
{
    {
        "sticker_id": "sample_id",
        "drink_name": "sample drink name",
        "drink_type": "sample drink type",
        "drink size": 12,
        "price": 99.00
    }
}

if HTTP STATUS != 200, fail to delete sticker

# get statistics of shifts
method POST
127.0.0.1:8000/sticker/shift_stats/

Request body
{
    {
        "start_time": "start_time_here"
        "end_time": "end_time_here"
    }
}