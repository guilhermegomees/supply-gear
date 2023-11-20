import { api } from "./services/api";
import { Buffer } from 'buffer';

export const fetchImage = async (
    imageName: string,
    onSuccess: (base64: string) => void,
    onError: (error: string) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const response = await api.get(`getImageProducts/${imageName}`, {
            responseType: 'arraybuffer',
        });

        const base64String: string = Buffer.from(response.data, 'binary').toString('base64');
        const base64: string = `data:image/jpeg;base64,${base64String}`;

        onSuccess(base64);
    } catch (error : any) {
        console.error('Erro ao obter imagem:', error.message);
        onError('Erro ao carregar a imagem');
    } finally {
        setLoading(false);
    }
};

// import { fetchImage } from '../../util';

// const [imagem, setImagem] = useState<string>('');
// const [error, setError] = useState<string>('');
// const [loading, setLoading] = useState<boolean>(true);

// useEffect(() => {
//     if (product.image) {
//         fetchImage(
//             product.image,
//             (base64: string) => setImagem(base64),
//             (errorMessage: string) => setError(errorMessage),
//             setLoading
//         );
//     }
// }, [product.image]);

// {loading ? (
//     <View style={{
//         height: 460,
//         width: '87%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#FFF',
//         borderRadius: 15,
//     }}>
//         <Image 
//             source={require('../../../assets/loading.gif')} 
//             style={{
//                 width: 300,
//                 height: 300
//             }}
//         />
//     </View>
// ) : (
//     <Image
//     source={{ uri: imagem }}
//     style={{
//         width: '87%',
//         height: 460,
//         borderRadius: 15,
//         display: !loading ? 'flex' : 'none',
//     }}
//     resizeMode="contain"
//     />
// )}

// Usar para chamar imagem