import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});
//patient
export const userIsAuthenticatedPatient = connectedRouterRedirect({
    authenticatedSelector: state => state.patient.isLoggedInPatient,
    wrapperDisplayName: 'userIsAuthenticatedPatient',
    redirectPath: '/login-patient-user'
});
const checkCdLink = (data) => {
    if (data) {
        return data;
    } else {
        return window.location.href;
    }
}
export const userIsNotAuthenticatedPatient = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.patient.isLoggedInPatient,
    wrapperDisplayName: 'userIsNotAuthenticatedPatient',
    // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    redirectPath: checkCdLink(sessionStorage.getItem('cd-link')),
    allowRedirectBack: false
});