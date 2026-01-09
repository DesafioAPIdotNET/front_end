import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Login = () => {
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/api/Auth/login', loginData);
            
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_name', response.data.name);

            toast.success(`Bem-vindo, ${response.data.name}!`);
            navigate('/register'); 
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data || "Erro ao conectar com o servidor.";
            toast.error(typeof msg === 'string' ? msg : "Login falhou.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Acesso ao Sistema</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="login"
                                placeholder="Digite seu usuário" 
                                value={loginData.login}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                placeholder="Digite sua senha" 
                                value={loginData.password}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mt-3">
                        <small>Não tem conta? <Link to="/register">Cadastre-se</Link></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;