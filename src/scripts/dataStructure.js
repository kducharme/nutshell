const database = {
    users: [
        {
            userId: 1,
            name: 'Kyle Ducharme',
            email: 'ducharme.kyle@gmail.com'
        },
        {
            userId: 2,
            name: 'Meg Ducharme',
            email: 'ducharme.meg@gmail.com'
        },
    ],
    events: [
        {
            eventId: 1,
            attendees: {
                userId: 1,
                userId: 3
            },
            name: 'dance recital',
            date: 'March 1, 2018',
            location: 'nashville software school'
        }
    ],
    connections: [
        {
            connectionId: 1,
            userId: 1,
            friendId: 2
        }
    ],
    tasks: [
        {
            taskId: 1,
            userId: 1,
            name: 'go to the store',
            due: 'April 29, 2018',
            complete: true
        }
    ],
    articles: [
        {
            articleId: 1,
            userId: 1,
            title: 'patriots win world series',
            summary: 'really great article',
            url: 'google.com/patriots'
        }
    ]
}