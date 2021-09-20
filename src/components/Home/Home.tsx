import React, { Suspense } from 'react'
// Imports for styling
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import character_image from '../../assets/images/sample_character_image.jpg'
import { Link } from 'react-router-dom'

// Imports for Authorization (& Suspense at the top)
import { AuthCheck } from 'reactfire'


interface Props{
    title: string;
}

// New Make Styles Code
const useStyles = makeStyles({
    root:{
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo:{
        margin: '0 0 0 0.45em'
    },
    logo_a: {
        color: 'rgb(28,24,22)'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransform: 'uppercase',
        textDecoration: 'none'
    },
    navigation: {
        display: 'flex'
    },
    nav_a:{
        display: 'block',
        padding: '1em',
        color: 'black'
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${character_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
    },
    main_text:{
        textAlign: 'center',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white'
    }    
})
export const Home = ( props: Props) => {

    // New Classes Variable using useStyles hook
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* NavBar  */}
            <nav>
                <div className={classes.navbar_container}>
                    <h1 className={ `${classes.logo}` }>
                        <a href="#" className={  `${classes.logo_a} ${classes.logo_navigation}` }></a>
                    </h1>
                    <ul className={`${classes.navigation} ${classes.logo_navigation} `}>
                        <li>
                            <Link to='/' href="" className={classes.nav_a}>Home</Link>
                        </li>
                        <Suspense fallback={'loading...'}>
                            <AuthCheck fallback={
                                <li>
                                    <Link to='/signin' href="" className={classes.nav_a}>Sign In</Link>
                                </li>
                                    }>
                                <li>
                                    <Link to='/dashboard' href="#" className={classes.nav_a}>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/signin' href="#" className={classes.nav_a}>Sign Out</Link>
                                </li>
                            </AuthCheck>
                        </Suspense>
                    </ul>
                </div>
            </nav>
            {/* End Nav Bar */}
            {/* Main Home Area */}
            <main className={classes.main}>
                <div className={classes.main_text}>
                    <h1> {props.title} </h1>
                    <Button color='primary' variant='contained'>Click Here</Button>
                </div>
            </main>
        </div>
    )
}