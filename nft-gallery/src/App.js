/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { AppBar, Toolbar, Button, Grid } from '@mui/material';
import Image from 'next/image';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

// Wallet Button component
const WalletButton = () => {
  const handleButtonClick = () => {
    // Handle button click logic here
  };

  return <Button color="inherit" onClick={handleButtonClick}>Connect Wallet</Button>;
};

const Home = () => {
  const GET_IMAGES = gql`
  query GetImages {
    images {
      src
      alt
      width
      height
    }
  }
`;

// Perform the GraphQL query using useQuery hook
const { loading, error, data } = useQuery(GET_IMAGES);
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

const images = data?.images || [];

  return (

    <div>
      <header>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </header>
      <ApolloProvider client={client}>
      <AppBar position="static">
        <Toolbar>
            <WalletButton />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ padding: '16px' }}>
        {images.map((image, index) => (
          <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
          </Grid>
        ))}
      </Grid>
    </ApolloProvider>
    </div>
  );
};

export default Home;
