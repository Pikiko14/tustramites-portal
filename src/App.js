import { ConfigProvider } from 'antd'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

// STYLE
import 'antd/dist/reset.css'
import './scss/app.scss'
import './scss/configs/breakpoints.scss'
// import './styles/theme.scss'

// COMPONENTS
import Loader from './components/loader/Loader'
import Alert from './helpers/alert/Alert'

import HttpClient from './helpers/network/HttpClient'

// CONTEXT
import AuthContext from './context/AuthContext'
import { Provider } from './context/store'

// COOKIE
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

if (Notification.permission !== 'granted') {
  Notification.requestPermission()
}

// PAGES
const LoginPage = lazy(() => import('./pages/login/login.page'))
const RegisterPage = lazy(() => import('./pages/login/register.page'))
const Policies = lazy(() => import('./pages/policies-advisory/policies.page'))
const HomePage = lazy(() => import('./pages/home/home.page'))
const ProcedurePage = lazy(() => import('./pages/procedure/procedure.page'))
const NotarialactPage = lazy(() => import('./pages/notarialact/notarialact.page'))
const NotarialactPageStepTwo = lazy(() => import('./pages/notarialactsteptwo/notarialact.page'))
const NotarialactPageStepThree = lazy(() => import('./pages/notarialactstepthree/notarialact.page'))
const NotarialactPageStepFour = lazy(() => import('./pages/notarialactstepfour/notarialact.page'))
const ProcedureNotarialPage = lazy(() => import('./pages/procedurenotarial/procedurenotarial.page'))
const NotaryPage = lazy(() => import('./pages/notary/notary.page'))
const ClientPage = lazy(() => import('./pages/client/client.page'))
const EnterprisePage = lazy(() => import('./pages/enterprise/enterprise.page'))
const GeneralPage = lazy(() => import('./pages/general/general.page'))
const FrequentQuestionPage = lazy(() =>
  import('./pages/frequent-questions/frequent-questions.page')
)
const RememberPage = lazy(() => import('./pages/remember/remember.page'))
const RememberRestartPage = lazy(() => import('./pages/remember/rememberrestart.page'))
const RestartPasswordPage = lazy(() => import('./pages/user/restartpassword.page'))
const OrderSummaryPage = lazy(() => import('./pages/ordersummary/ordersummary.page'))
const DocumentResultPage = lazy(() => import('./pages/documentresult/documentresult.page'))
const DatePage = lazy(() => import('./pages/date/date.page'))
const ResumePage = lazy(() => import('./pages/resume/resume.page'))
const NotificationPage = lazy(() => import('./pages/notification/notification.page'))

function App() {
  const [user, setUser] = useState()
  //const [notifications, setNotifications] = useState([])

  const loadUser = async () => {
    await HttpClient.get('/api/user/reload')
      .then((res) => {
        setUser(res.data)
        //loadNotifications()
      })
      .catch((err) => {
        if (cookies.get('token')) {
          Alert.show({
            type: 'warning',
            title: '',
            message: 'Sesión expirada, por favor vuelva a ingresar.'
          })
          setTimeout(() => {
            cookies.remove('token')
            window.location.href = '/login'
          }, 1500)
        }
      })
  }

  // RUTAS PRIVADAS
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        cookies.get('token') ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )

  /*const loadNotifications = async () => {
    console.log('entro')
    await HttpClient.get('/api/notification-new')
      .then((res) => {
        if (res.status == 200 && res.data && res.data.length > 0) {
          let count = parseInt(localStorage.getItem('notifications'))
          setNotifications(res.data)
          localStorage.setItem('notifications', (res.data.length).toString())
          if (count && res.data.length > count)
            showNotification()

        }
      })
      .catch((err) => {
      })
  }

  const showNotification = () => {
    new Notification('Tus trámites, notificación', {
      body: 'Tienes nuevas notificaciones en nuestra plataforma.'
    })
  }

  const interval = () => {
    const interval = setInterval(() => {
      loadNotifications()
    }, 40 * 60 * 1000)

    return () => clearInterval(interval)
  }*/

  useEffect(() => {
    loadUser()
    /*const cleanupFunction = interval()
    return cleanupFunction*/
  }, [])

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#8556ee', borderRadius: 20, colorError: '#c62626' } }}
    >
      <AuthContext.Provider
        value={{
          user: user,
          updateUser: setUser
        }}
      >
        <Provider>
          {/*<NotificationContext.Provider
            value={{
              notifications: notifications,
              setNotifications: setNotifications
            }}>*/}
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/policies" component={Policies} />
                <Route path="/remember" component={RememberPage} />
                <Route path="/rememberrestart" component={RememberRestartPage} />
                {/* PANEL DE CONTROL */}
                <PrivateRoute exact path="/" component={HomePage} />
                {/*<PrivateRoute exact path="/" component={() => <HomePage notifications={notifications} />} />*/}
                <PrivateRoute exact path="/notarialact" component={NotarialactPage} />
                <PrivateRoute exact path="/notarialactsteptwo" component={NotarialactPageStepTwo} />
                <PrivateRoute
                  exact
                  path="/notarialactstepthree"
                  component={NotarialactPageStepThree}
                />
                <PrivateRoute
                  exact
                  path="/notarialactstepfour"
                  component={NotarialactPageStepFour}
                />
                <PrivateRoute exact path="/procedurenotarial" component={ProcedureNotarialPage} />
                <PrivateRoute exact path="/notary" component={NotaryPage} />
                <PrivateRoute exact path="/client" component={ClientPage} />
                <PrivateRoute exact path="/enterprise" component={EnterprisePage} />
                <PrivateRoute exact path="/general" component={GeneralPage} />
                <PrivateRoute exact path="/questions" component={FrequentQuestionPage} />
                <PrivateRoute exact path="/restartpassword" component={RestartPasswordPage} />
                <PrivateRoute exact path="/ordersummary" component={OrderSummaryPage} />
                <PrivateRoute exact path="/documentresult" component={DocumentResultPage} />
                <PrivateRoute exact path="/date" component={DatePage} />
                <PrivateRoute exact path="/resume" component={ResumePage} />
                <PrivateRoute exact path="/notification" component={NotificationPage} />
                <PrivateRoute exact path="/procedure" component={ProcedurePage} />
              </Switch>
            </BrowserRouter>
          </Suspense>
          {/*</NotificationContext.Provider>*/}
        </Provider>
      </AuthContext.Provider>
    </ConfigProvider>
  )
}

export default App
