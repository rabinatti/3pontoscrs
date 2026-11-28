import React from 'react';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Telas de Autenticação
import InicialScreen from './screens/inicial/InicialScreen';
import LoginScreen from './screens/login/LoginScreen';
import CadastroScreen from './screens/cadastro/CadastroScreen';

// Telas Logadas
import CatalogoScreen from './screens/catalogo/CatalogoScreen';
import PerfilPrestadorScreen from './screens/perfilPrestador/PerfilPrestadorScreen';
import MeusPedidosScreen from './screens/meusPedidos/MeusPedidosScreen';
import PlanosScreen from './screens/planos/PlanosScreen';
import PerfilScreen from './screens/perfil/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#F37021',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          height: 62 + Math.max(insets.bottom, 16),
          paddingBottom: + Math.max(insets.bottom, 16),
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'search';
          if (route.name === 'Busca') iconName = 'search';
          else if (route.name === 'Meus Pedidos') iconName = 'clipboard-outline';
          else if (route.name === 'Ser Prestador') iconName = 'hammer-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Busca" component={CatalogoScreen} />
      <Tab.Screen name="Meus Pedidos" component={MeusPedidosScreen} />
      <Tab.Screen name="Ser Prestador" component={PlanosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Inicial" component={InicialScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="PerfilPrestador" component={PerfilPrestadorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}