# ParkFlow

Parkflow este o aplicație inovatoare dedicată reducerii traficului în orașe prin intermediul unor senzori de parcare inteligenti. Prin intermediul acestei aplicații, utilizatorii beneficiază de informații în timp real cu privire la locurile de parcare disponibile și pot planifica în mod eficient traseele pentru a ajunge rapid la destinație.

Cu ajutorul tehnologiei avansate a senzorilor de parcare, Parkflow monitorizează în mod constant locurile de parcare și transmite informații actualizate despre acestea către utilizatori. Prin intermediul hărții interactive, utilizatorii pot vizualiza instantaneu locurile libere de parcare în apropierea lor, eliminând astfel nevoia de a căuta în mod repetat un loc disponibil. 

## Ce poate face?
Va oferim un serviciu complet de gestionare a parcărilor, cu facilități moderne și ușor de utilizat. Prin intermediul aplicației noastre mobile, veți avea acces la următoarele funcționalități:

- Rezervarea locurilor de parcare: Puteți rezerva un loc de parcare în avans, asigurându-vă că veți avea un spațiu disponibil în locația dorită. Acest lucru vă va economisi timp prețios și vă va oferi certitudinea că veți găsi locul de parcare dorit.
- Harta interactivă: Veți putea vizualiza pe hartă locul exact în care puteți parca. Prin intermediul acestei funcții, veți putea identifica rapid și ușor locurile de parcare disponibile în zona dorită. Aceasta vă va permite să găsiți cel mai convenabil loc de parcare.
- Plata parcării: Prin intermediul aplicației sau a platformei noastre, veți putea plăti parcarea într-un mod simplu și rapid. Nu va mai trebui să căutați monede sau să vă faceți griji cu privire la parcarea ilegală. Veți putea efectua plăți sigure și comode direct de pe telefonul dvs.
- Monitorizarea timpului de parcare: Veți avea posibilitatea de a vizualiza cât timp mai aveți plătit pentru locul de parcare. Acest aspect vă va ajuta să vă gestionați mai eficient timpul și să evitați eventualele penalități pentru depășirea duratei de parcare.

În concluzie, prin intermediul serviciului nostru, veți beneficia de o experiență mai ușoară și mai convenabilă în gestionarea parcărilor. Veți putea rezerva locuri în avans, găsi rapid locuri de parcare, plăti fără probleme și monitoriza timpul petrecut în parcarea aleasă.

## Software
- React native(frontend)
- Spring si Firebase (backend)

## Hardware
Partea hardware a sistemului Parkflow este împărțită în două componente principale: senzori și hub-uri.

Senzorii sunt dispozitive instalate pe fiecare loc de parcare, care monitorizează în timp real dacă locul este ocupat sau disponibil. Acești senzori sunt conectați la hub-uri prin intermediul protocolului de comunicații LoRa (Low-Power Wide-Area Network).

Hub-urile reprezintă punctele centrale de conectare și comunicație în cadrul sistemului Parkflow. Ele colectează informațiile de la mai mulți senzori și facilitează comunicarea între aceștia și serverul central. Hub-urile sunt amplasate în diverse locații strategice și au multiple funcționalități.

Iată câteva caracteristici cheie ale hub-urilor Parkflow:

- Conectarea senzorilor: Hub-urile permit conectarea și gestionarea unui număr mare de senzori dintr-o zonă dată. Aceasta înseamnă că pot monitoriza simultan mai multe locuri de parcare, oferind informații actualizate despre disponibilitatea acestora.

- Comunicare cu serverul central: Hub-urile facilitează comunicarea bidirecțională între senzori și serverul central al sistemului Parkflow. Aceasta permite transferul de date în timp real, precum actualizări ale stării locurilor de parcare și informații despre plăți.

- Opțiune de plată cu numerar: Hub-urile oferă utilizatorilor posibilitatea de a plăti parcare și cu numerar. Astfel, aceștia pot alege să efectueze plăți tradiționale, eliminând astfel necesitatea unui card de plată sau a unui dispozitiv electronic.
