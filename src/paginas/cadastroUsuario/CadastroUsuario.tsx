import React, { useState, useEffect, ChangeEvent } from 'react';
import Usuario from '../../models/Usuario' ;
import { cadastroUsuario } from '../../services/Services';
import { Grid, Box, Typography, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("");
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [usuarioResult, setUsuarioResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        }
    )

    useEffect(() => {
        if (usuarioResult.id !== 0) {
            navigate("/login")
        }
    }, [usuarioResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == usuario.senha){
       //console.log(usuarioResult)
        cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResult)
     
        toast.success("Usuario cadastrado com sucesso", {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
           });
        }else{
            toast.error("Dados inconsistentes. Favor verificar as informações de cadastro.", {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
               });
        }
    }

    return (

        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'> </Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>

                    <form onSubmit={onSubmit}>

                        <Typography variant='h3' gutterBottom 
                        color='textPrimary' component='h3' align='center' 
                            className="textos2">Cadastrar </Typography>

                        <TextField
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='nome' label='nome' variant='outlined'
                            name='nome' margin='normal' fullWidth />

                        <TextField
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='usuario' label='usuario' variant='outlined'
                            name='usuario' margin='normal' fullWidth />

                        <TextField
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha' label='senha' variant='outlined'
                            name='senha' margin='normal' type='password' fullWidth />

                        <TextField
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id='confirmarSenha' label='confirmarSenha' variant='outlined'
                            name='confirmarSenha' margin='normal' type='password' fullWidth />

                        <TextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            value={usuario.foto}
                            id='foto' label='foto' variant='outlined'
                            name='foto' margin='normal' fullWidth />

                        <Box marginTop={2} textAlign='center'>
                           
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' 
                                className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>

            </Grid>

        </Grid>
    );
}

export default CadastroUsuario;