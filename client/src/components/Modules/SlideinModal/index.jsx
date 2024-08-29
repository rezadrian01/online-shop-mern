import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const SlideinModal = ({ setIsOpenModal, isOpenModal }) => {
    return (
        <>
            <Dialog
                open={isOpenModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsOpenModal(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenModal(false)}>Disagree</Button>
                    <Button onClick={() => setIsOpenModal(false)}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SlideinModal