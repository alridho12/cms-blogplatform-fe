import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function ModalDelete({article_id}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`https://cms-blogplatform-backend.vercel.app/article/${article_id}`)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: 'Articl has been delete',
                    showConfirmButton: false,
                    icon: 'success',
                    target: '#custom-target',
                    timer: 2500,
                    timerProgressBar: true,
                    customClass: {
                        container: 'position-absolute',
                    },
                    toast: true,
                    position: 'bottom-right',
                });
                setTimeout(function () {
                }, 1000);
                window.location.reload();
            })
            .catch((err) => {
                alert(err);
                setShow(false);
            });


    }

    return (
        <>
            <Button variant="primary" style={{ background: 'transparent', border: 'none' }} onClick={handleShow}>
                <i style={{ fontSize: '22px', color: "red" }} className="bi bi bi-trash"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, are you delete this article!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete Article
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;