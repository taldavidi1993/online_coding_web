// const { io } = require('../../index');

// const { CodeBlock } = require('../db/CodeBlock');

// exports.onConnection = socket => {
//   socket.on('join', ({ room }) => {
//     console.log('join');
//     socket.join(room);
//   });
//   socket.on('update', async ({ content, id }) => {
//     await CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
//     io.to(id).emit('updateBack', { content });
//     console.log(content);
//   });
//   socket.on('updateTitle', async ({ title, id }) => {
//     await CodeBlock.findOneAndUpdate({ _id: id }, { title: title });
//     socket.broadcast.to(id).emit('updateTitleBack', { title });
//   });

//   socket.on('disconnect', () => {});
// };
