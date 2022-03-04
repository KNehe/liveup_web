const useNavigator = (router, authDetails) => {

    if (authDetails.user.role === 'Admin') {
        router.replace('/medics')
    } else if (authDetails.user.role === 'Receptionist') {
        router.replace('/receptionists')
    } else {
        router.replace('/login')
    }
}

export {useNavigator}