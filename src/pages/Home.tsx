import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {


  const [phone, setPhone ] = useState('');
  const [code, setCode ] = useState('');
  const [ isSend, setIsSend ] = useState('')
  const [isVerify, setIsVerify] = useState(false);



  const sendCode = async () => {
    await fetch("https://verify-sms-app.herokuapp.com/login?phoneNumber="+phone, {
      method: "GET"
    }).then(response => {
      response.json()
      console.log(response.status)
      if(response.status!==200){
        setIsSend('false')
      }
    })
    .then(data => {

    })
  };

  const verify = async () => {

    const data = await fetch("https://verify-sms-app.herokuapp.com/verify?phoneNumber="+phone+"&code="+code, {
      method: "GET"
    });
    const jsonData = await data.json();
    console.log(jsonData)
    setIsVerify(true)

  }


  return (
    <IonPage className='page'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Twilio OTP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  scroll-y="false">
      <div className="content">
        <div>
          <IonInput placeholder='905485269889' type={'text'}  value={phone} className="input" min="40" onIonChange = {e  => setPhone(e.detail.value!)}/></div>
        <div><IonButton expand='block' onClick={sendCode}>
          Send Code
        </IonButton></div>

            <div>
              <IonInput placeholder='Code' type={'text'}  value={code} className="input" min="40" onIonChange = {e  => setCode(e.detail.value!)}/></div>
        <div><IonButton expand='block' onClick={verify}>Verify
        </IonButton></div>
            </div>

             
              <IonAlert
              isOpen={isVerify}
              onDidDismiss={() => setIsVerify(false)}
              header={'Verify'}
              message={'Verifycation Is OK.'}
              buttons={['OK']}
            />
            <IonAlert
              isOpen={isSend === 'false'}
              onDidDismiss={() => setIsVerify(false)}
              header={'Verify'}
              message={'Verification SMS can not be sent.'}
              buttons={['OK']}
            />
          

      </IonContent>
    </IonPage>
  );
};

export default Home;
