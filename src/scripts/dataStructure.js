const database = {
    'users': [
        {
            userId: 1,
            name: 'Kyle Ducharme',
            email: 'ducharme.kyle@gmail.com',
            friends: {
                userId: 3,
                userId: 4,
                userId: 7
            },
            myEvents: [
                {
                    eventId: 1,
                    name: 'dance recital',
                    date: 'March 1, 2018',
                    location: 'nashville software school'
                },
                {
                    eventId: 2,
                    name: 'dinner party',
                    date: 'May 22, 2018',
                    location: 'restaurant'
                }
            ],
            friendsEvents: [
                {
                    friendId: 2,
                    eventId: 1
                },
                {
                    friendId: 4,
                    eventId: 3
                },
            ],
            myArticles: [
                {
                    articleId: 1,
                    title: 'patriots win world series',
                    summary: 'really great article',
                    url: 'google.com/patriots'
                },
                {
                    articleId: 2,
                    title: 'friends is a cool show',
                    summary: 'talked about how the show is cool',
                    url: 'google.com/friends'
                }
            ],
            friendsArticles: [
                {
                    friendId: 2,
                    articleId: 1
                },
                {
                    friendId: 4,
                    articleId: 3
                },
            ],
            tasks: [
                {
                    taskId: 1,
                    name: 'go to the store',
                    due: 'April 29, 2018',
                    complete: true
                },
                {
                    taskId: 2,
                    name: 'learn how to code',
                    due: 'Dec 25, 2018',
                    complete: false
                }
            ],
            chats: [
                {
                    chatId: 1,
                    message: 'Hello world',
                    date: 'April 21, 2018',
                    userId: 2
                },
                {
                    chatId: 2,
                    message: 'Hi there',
                    date: 'April 23, 2018',
                    userId: 4
                }
            ]
        }
    ]
}