import {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDBContext} from '../../Context/DBContext';
import {InsertCard} from '../../Data/Database';
import {SpendsHook} from '../../hooks/SpendsHook';
import {Picker} from '../HomeScreen2/Picker';

interface modalProps {
  visible: boolean;
  setVisible: (c: boolean) => void;
  GetCards: () => void;
}

export const ModalComponent = ({visible, setVisible, GetCards}: modalProps) => {
  const {openPick, setOpenPick} = SpendsHook();
  const [card, setCard] = useState({
    name: '',
    type: '',
  });

  const db = useDBContext();

  const SetValues = (field: any, value: string) => {
    setCard({
      ...card,
      [field]: value,
    });
  };

  const SaveCard = async () => {
    if (card.name === '') {
      Alert.alert('Error', 'Complete los campos');
      return;
    }
    if (card.type === '') {
      Alert.alert('Error', 'Complete los campos');
      return;
    }

    await InsertCard(db, card.name, card.type);
    setVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.Modal}>
          <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Agregar Tarjeta</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={styles.Name}>Nombre de tarjeta:</Text>
            <TextInput
              style={styles.NameInput}
              placeholder={'Nombre...'}
              onChangeText={value => SetValues('name', value)}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={styles.Name}>tipo de tarjeta:</Text>
            <Picker
              openPick={openPick}
              setOpenPick={setOpenPick}
              isFlex
              getType1={value => {
                SetValues('type', value);
              }}
              DataTypes={['Credito', 'Debito']}
            />
          </View>
          <View style={styles.Buttons}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.Text}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                SaveCard();
                GetCards();
              }}>
              <Text style={styles.Text}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: '#E7E7E7',
    width: '80%',
    height: '36%',
    marginTop: 80,
    padding: 0,
    borderRadius: 15,
  },
  Buttons: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
    justifyContent: 'space-around',
    zIndex: -2,
  },
  Button: {
    backgroundColor: '#00DA73',
    width: '45%',
    height: 50,
    margin: 3,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'ChakraPetch-Regular',
    fontWeight: 'bold',
  },
  TitleContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: 28,
    textTransform: 'uppercase',
    fontFamily: 'ChakraPetch-Regular',
  },
  Name: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'ChakraPetch-Regular',
    margin: 10,
  },
  NameInput: {
    borderWidth: 0.8,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: 'white',
    fontSize: 26,
    width: '73%',
  },
});
