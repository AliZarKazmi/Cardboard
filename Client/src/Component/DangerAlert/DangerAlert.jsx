import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertData } from '../../Store/slices/alertSlice';

function DangerAlert() {

    const dispatch = useDispatch();

    const alertData = useSelector((state) => {
        return state.alertData
    })

    if (alertData.state) {
        return (
            <Alert variant="danger" className=' position-absolute z-3 top-0 w-25' onClose={() => dispatch(setAlertData({ state: false }))} dismissible>
                <Alert.Heading>{alertData.heading}</Alert.Heading>
                <p>
                    {alertData.content}
                </p>
            </Alert>
        );
    }
}

export default DangerAlert;