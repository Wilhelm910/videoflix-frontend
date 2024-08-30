import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '80vh', // Maximale Höhe des Modals auf 80% der Viewport-Höhe setzen
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
    overflowY: 'auto', // Scrollen bei Bedarf aktivieren
};


export default function Footer() {
    const [open, setOpen] = useState(false);
    const [isImpressum, setIsImpressum] = useState<boolean>(false);
    const [isDatenschutz, setIsDatenschutz] = useState<boolean>(false);


    const handleOpen = (e: "impressum" | "datenschutz") => {
        setOpen(true)
        if (e === "impressum") {
            setIsImpressum(true)
        }
        if (e === "datenschutz") {
            setIsDatenschutz(true)
        }
    }

    const handleClose = () => {
        setOpen(false);
        if (isImpressum) {
            setIsImpressum(false)
        }
        if (isDatenschutz) {
            setIsDatenschutz(false)
        }
    }


    return (
        <Box>
            <div>
                <Button onClick={() => handleOpen('impressum')}>Impressum</Button>
                <Button onClick={() => handleOpen('datenschutz')}>Datenschutz</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {isImpressum && <Impressum />}
                        {isDatenschutz && <Datenschutz />}
                    </Box>
                </Modal>
            </div>
        </Box>
    )
}
