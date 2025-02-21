import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaf4f1;
  padding: 20px;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  @media (min-width: 768px) {
    width: 500px;
  }

  svg {
    margin-right: 10px;
  }
`;

const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #000000;
`;

const Text = styled.span`
  font-size: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 20px 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const SearchComponent = () => {
  return (
    <Container>
      <Title>Recherchez parmi une grande sélection d'activité culturelle</Title>
      <SearchItem>
        <SearchIcon viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 106.32 3.22l4.95 4.95-1.42 1.42-4.95-4.95A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </SearchIcon>
        <Text>Musée d'art comtemporain</Text>
      </SearchItem>
      <SearchItem>
        <SearchIcon viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 106.32 3.22l4.95 4.95-1.42 1.42-4.95-4.95A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </SearchIcon>
        <Text>Concert à Marseille</Text>
      </SearchItem>
      <SearchItem>
        <SearchIcon viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 106.32 3.22l4.95 4.95-1.42 1.42-4.95-4.95A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </SearchIcon>
        <Text>Musée accessible en fauteuil</Text>
      </SearchItem>
      <SearchItem>
        <SearchIcon viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 106.32 3.22l4.95 4.95-1.42 1.42-4.95-4.95A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </SearchIcon>
        <Text>Monument à Paris</Text>
      </SearchItem>
    </Container>
  );
};

export default SearchComponent;
