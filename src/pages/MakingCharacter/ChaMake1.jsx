import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ChaMake1 = () => {
  const navigate = useNavigate();
  const selectedColor = useSelector((state) => state.color.selectedColor);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedColor != '') {
        navigate('/ChaComplete', { state: { selectedColor } });
      } else {
        navigate('/ChaColor');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [selectedColor, navigate]);

  return (
    <Container>
      {selectedColor ? <CharacterImage src="src/assets/chaMaking2.png" alt="애착이 변신2" /> : <CharacterImage src="src/assets/chaMaking1.png" alt="애착이변신1" />}
    </Container>
  );
};

export default ChaMake1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #FFB0CF 50%, #FFE1A9 100%);
  background-size: 100% 100%;
  background-position: center top ;
  background-repeat: no-repeat;
`;


const CharacterImage = styled.img`
  width: 330px;
  height: auto;
  object-fit: cover;
`;