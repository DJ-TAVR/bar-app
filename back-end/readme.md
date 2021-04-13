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
127.0.0.1:8000/sticker/shifts_stats/

Request body
{
    {
        "start_time": "start_time_here",
        "end_time": "end_time_here"
    }
}

sample result:
{
    "average_mlpp": 200.0,
    "cumulative_mlpp": 3,
    "top3_MLPP": [
        {
            "start_time": "2021-03-16 02:00:15",
            "end_time": "2021-03-18 22:01:04",
            "percentage_overpour": 2.0
        }
    ],
    "over_pouring_percentage": 100.0
}

# create a bartender
method POST
127.0.0.1:8000/account/create_bartender/

Request body
{
    "first_name": "first_name_here",
    "last_name": "last_name_here",
    "email": "email_here"
}

if HTTP STATUS != 200, fail to create bartender
if success, an email will be sent to bartender's email with username and password

# update a bartender
method POST
127.0.0.1:8000/account/update_bartender/

Request body
{
    "id": id_here,
    "first_name": "first_name_here",
    "last_name": "last_name_here",
    "email": "email_here"
}

if HTTP STATUS != 200, fail to update bartender

# get bartender list
method POST
127.0.0.1:8000/account/get_bartenders/

Result
[
    {
        "account": {
            "first_name": "he",
            "last_name": "ha",
            "username": "tuanhuynh",
            "email": "newmail@gamill.com"
        },
        "id": 2
    },
    {
        # second bartenders info here
    }
]

# delete a bartender
method POST
127.0.0.1:8000/account/delete_bartender/

Request body
{
    "bartender_id": id_here 
}

Result
{
    "error_message": "will_return_error_message_json_if_status_code_not_200"
}

if HTTP STATUS != 200, fail to delete bartender

# get shifts
method POST
127.0.0.1:8000/sticker/get_shifts/

Request body
{
    "start_time": "2021-03-16 02:00:15",
    "end_time": "2021-03-18 22:01:04",
}

Result
{
    [
        {
            "start_time": start_time_of_shift_1_in_specified_range,
            "end_time": end_time_of_shift_1_in_specified_range,
            "percentage_overpour": 100,
            "overpouring_count": 3
        },
        {
            shift_2_here ...
        }
    ]
}

if HTTP STATUS != 200, fail to delete bartender