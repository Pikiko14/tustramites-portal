import { useEffect } from 'react'
import Alert from '../helpers/alert/Alert'

const useSession = () => {
  let timeoutID

    function setup() {
      document.addEventListener('mousemove', resetTimer, false)
      document.addEventListener('mousedown', resetTimer, false)
      document.addEventListener('keypress', resetTimer, false)
      document.addEventListener('DOMMouseScroll', resetTimer, false)
      document.addEventListener('mousewheel', resetTimer, false)
      document.addEventListener('touchmove', resetTimer, false)
      document.addEventListener('MSPointerMove', resetTimer, false)

      startTimer()
    }

    function unSetup() {
      document.removeEventListener('mousemove', resetTimer, false)
      document.removeEventListener('mousedown', resetTimer, false)
      document.removeEventListener('keypress', resetTimer, false)
      document.removeEventListener('DOMMouseScroll', resetTimer, false)
      document.removeEventListener('mousewheel', resetTimer, false)
      document.removeEventListener('touchmove', resetTimer, false)
      document.removeEventListener('MSPointerMove', resetTimer, false)

    }
    

    function startTimer() {
      timeoutID = window.setTimeout(goInactive, 300000)
    }

    function resetTimer(e) {
      console.log('se reinicia')
      window.clearTimeout(timeoutID)

      goActive()
    }

    function goInactive() {
      Alert.show({
        type: 'warning',
        title: '',
        message: `Su sessión esta apunto de expirar, Si presiona aceptar se extendera 5 minutos mas su sessión`,
        btnOk: 'Aceptar',
        btnCancel: 'Cerrar sesión',
        fnOk: () => {
          resetTimer()
        },
        buttonX: false,
        fnCancel: () => {
          localStorage.clear()
          window.location.href = '/login' 
        }
      })
    }

    function goActive() {
      startTimer()
    }

    useEffect(() => {
      setup()
      return () => {
        unSetup()
      }
    },[])

}

export default useSession