import { StyleSheet } from "react-native"

export default style = StyleSheet.create({

    container: {
        backgroundColor:colors.primary,
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },

    bigTitle:{
        color:colors.third,
        fontSize:85,
        fontWeight:'900',
        textAlign:'center'
    
    },
    
    paragraph:{
        color:colors.secand,
        fontSize:25,
        textAlign:'center',
        
    },

    form: {
        flexDirection:'column',
        alignItems:'center',
        paddingVertical:15,
    },
    input: {
        fontSize:25,
        color:colors.secand,
        marginHorizontal:15,
        width:'90%'
    },
    FormText:{
        fontSize:15,
        color:colors.third,
        marginVertical:10,
    },
    inputField:{
        borderRadius:10,
        fontSize:12,
        backgroundColor:colors.third,
        paddingHorizontal:15,
        paddingVertical:12,
    },
    button :{
        marginTop:10, width:'80%',
        paddingVertical:10,
        marginTop:35,
        alignSelf:'center'

    },

    mainLogo:{
        width:'50%',
        height:'30%'
        
    }
})

