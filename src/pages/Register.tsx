import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Form, Button, Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if(formData.password.length < 6) {
            toast.warning("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            await api.post('/api/Auth/register', formData);
            toast.success("Usuário cadastrado com sucesso!");
            navigate('/'); 
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data || "Erro ao realizar cadastro.";
            toast.error(typeof msg === 'string' ? msg : "Erro no cadastro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Novo Usuário</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                placeholder="Ex: Lucas Henrique" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Login (Usuário)</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="login"
                                        placeholder="Ex: lucas.dev" 
                                        value={formData.login}
                                        onChange={handleChange}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password"
                                        placeholder="Mínimo 6 caracteres" 
                                        value={formData.password}
                                        onChange={handleChange}
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2 mt-3">
                            <Button variant="success" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : 'Cadastrar'}
                            </Button>
                            <Link to="/" className="btn btn-outline-secondary">
                                Voltar para Login
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;