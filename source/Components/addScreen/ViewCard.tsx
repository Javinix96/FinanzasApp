import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDBContext} from '../../Context/DBContext';
import {DeleteCards, GetCards} from '../../Data/Database';
import {ModalComponent} from './ModalComponent';

interface cardProps {
  type1: string;
  setTypeCard: (c: string) => void;
}

export const ViewCard = ({type1, setTypeCard}: cardProps) => {
  const [cards, setCards] = useState<Array<any>>([]);
  const [cards2, setCards2] = useState<Array<any>>([]);
  const [visible, setVisible] = useState(false);

  const db = useDBContext();
  const GetCardsDB = async () => {
    setCards([]);
    setCards2([]);
    let cardsDb = await GetCards(db);
    // console.log('longitud de cardsDB: ' + cardsDb.length);
    //  cardsDb = cardsDb.filter(c => c.typeCard === type1);
    cardsDb.map(item => {
      setCards((c: any) => [
        ...c,
        {name: item.name, selected: false, typeCard: item.typeCard},
      ]);
      if (item.typeCard === type1) {
        setCards2((c: any) => [
          ...c,
          {name: item.name, selected: false, typeCard: item.typeCard},
        ]);
      }
    });
  };

  useEffect(() => {
    setCards([]);
    setCards2([]);
    GetCardsDB();
    console.log('longitud de setCards: ' + cards.length);
    //     setCards2(cards.filter((c: any) => c.typeCard.includes(type1)));
  }, [type1]);

  //   useFocusEffect(focus);

  //   useEffect(() => {
  //     setCards2(cards.filter((c: any) => c.typeCard.includes(type1)));
  //     //     console.log(cards2);
  //   }, []);

  return (
    <View style={styles.CardsView}>
      <View style={styles.CardTypes}>
        {cards2.length <= 0 ? (
          <View>
            <Text>Cargando</Text>
          </View>
        ) : (
          cards2.map((item: any, index: number) => {
            return (
              <RadioButton
                key={index}
                name={item.name}
                selected={item.selected}
                index={index}
                cards1={cards2}
                setCards={(c: any) => setCards2(c)}
                setCardType={(c: any) => setTypeCard(c)}
              />
            );
            // <RadioButton key={index} name={item.name} selected={item.selected} />;
          })
        )}
        <ModalComponent
          visible={visible}
          setVisible={c => setVisible(c)}
          GetCards={() => GetCardsDB()}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
        <Text style={{color: '#0072EA', fontSize: 22}}>Agregar Tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
};

interface propC {
  name: any;
  selected: any;
  index: any;
  cards1: Array<any>;
  setCards: (c: any) => void;
  setCardType: (c: String) => void;
}

export const RadioButton = ({
  name,
  selected,
  index,
  setCards,
  cards1,
  setCardType,
}: propC) => {
  const setCard = () => {
    const cardL = cards1.map((card: any, ind: number) => {
      if (ind === index) {
        card.selected = true;
        setCardType(card.name);
      } else card.selected = false;
      return card;
    });

    setCards(cardL);
  };

  const scale = useRef(new Animated.Value(0)).current;
  const growIn = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.ContainerR}>
      <TouchableOpacity
        style={styles.CircleOut}
        onPress={() => {
          setCard();
          scale.setValue(0);
          growIn();
        }}
        activeOpacity={1}>
        {selected === true && (
          <Animated.View
            style={{
              ...styles.Circle,
              transform: [{scaleX: scale}, {scaleY: scale}],
            }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'ChakraPetch-Regular',
          textTransform: 'uppercase',
        }}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //   AmountS: {
  //     borderWidth: 1,
  //     width: '70%',
  //     height: 60,
  //     borderRadius: 10,
  //     borderColor: '#CECECE',
  //     fontSize: 30,
  //     padding: 10,
  //   },
  //   Button: {
  //     backgroundColor: '#004BF7',
  //     width: '80%',
  //     height: '50%',
  //     borderRadius: 20,
  //     justifyContent: 'center',
  //   },
  //   ButtonText: {
  //     textAlign: 'center',
  //     width: '100%',
  //     fontSize: 30,
  //     color: 'white',
  //     fontWeight: 'bold',
  //   },
  CardsView: {
    //     height: 300,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardTypes: {
    width: '90%',
    //     height: '100%',
    //     backgroundColor: '#9E9E9E',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ContainerR: {
    //     backgroundColor: 'red',
    height: 50,
    width: 170,
    justifyContent: 'space-around',
    padding: 6,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  CircleOut: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Circle: {
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#303030',
  },
});
