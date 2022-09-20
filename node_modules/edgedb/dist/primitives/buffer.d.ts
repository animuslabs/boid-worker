/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference types="node" />
import char from "./chars";
import * as bi from "./bigint";
import { LegacyHeaderCodes } from "../ifaces";
export declare class BufferError extends Error {
}
export declare class WriteBuffer {
    buffer: Buffer;
    private size;
    private pos;
    constructor();
    get position(): number;
    reset(): void;
    private ensureAlloced;
    private __realloc;
    writeChar(ch: char): this;
    writeString(s: string): this;
    writeBytes(buf: Buffer): this;
    writeInt16(i: number): this;
    writeInt32(i: number): this;
    writeFloat32(i: number): this;
    writeFloat64(i: number): this;
    writeUInt8(i: number): this;
    writeUInt16(i: number): this;
    writeUInt32(i: number): this;
    writeInt64(i: number): this;
    writeBigInt64(i: bi.BigIntLike): this;
    writeBuffer(buf: Buffer): this;
    unwrap(): Buffer;
}
export declare class WriteMessageBuffer {
    private buffer;
    private messagePos;
    constructor();
    reset(): this;
    beginMessage(mtype: char): this;
    endMessage(): this;
    writeLegacyHeaders(headers: {
        [key in keyof typeof LegacyHeaderCodes]?: string | Buffer;
    } | null): this;
    writeChar(ch: char): this;
    writeString(s: string): this;
    writeBytes(val: Buffer): this;
    writeInt16(i: number): this;
    writeInt32(i: number): this;
    writeUInt16(i: number): this;
    writeUInt32(i: number): this;
    writeBigInt64(i: bi.BigIntLike): this;
    writeFlags(h: number, l: number): this;
    writeBuffer(buf: Buffer): this;
    writeSync(): this;
    writeFlush(): this;
    unwrap(): Buffer;
}
export declare class ReadMessageBuffer {
    private bufs;
    private len;
    private buf0;
    private pos0;
    private len0;
    private curMessageType;
    private curMessageLen;
    curMessageLenUnread: number;
    private curMessageReady;
    constructor();
    get length(): number;
    feed(buf: Buffer): boolean;
    private feedEnqueue;
    private ensureFirstBuf;
    private checkOverread;
    private __nextBuf;
    private discardBuffer;
    private _finishMessage;
    private __readBufferCopy;
    private _readBuffer;
    readBuffer(size: number): Buffer;
    readUUID(): string;
    readChar(): char;
    readInt16(): number;
    readInt32(): number;
    readUInt16(): number;
    readUInt32(): number;
    readBigInt64(): bigint;
    readString(): string;
    readLenPrefixedBuffer(): Buffer;
    takeMessage(): boolean;
    getMessageType(): char;
    takeMessageType(mtype: char): boolean;
    putMessage(): void;
    discardMessage(): void;
    consumeMessage(): Buffer;
    consumeMessageInto(frb: ReadBuffer): void;
    finishMessage(): void;
}
export declare class ReadBuffer {
    private buffer;
    private pos;
    private len;
    constructor(buf: Buffer);
    get position(): number;
    get length(): number;
    finish(): void;
    discard(size: number): void;
    readUInt8(): number;
    readUInt16(): number;
    readInt8(): number;
    readInt16(): number;
    readInt32(): number;
    readFloat32(): number;
    readFloat64(): number;
    readUInt32(): number;
    private reportInt64Overflow;
    readInt64(): number;
    readBigInt64Fallback(): bi.BigIntLike;
    readBigInt64(): bi.BigIntLike;
    readBuffer(size: number): Buffer;
    readUUID(): string;
    consumeAsString(): string;
    consumeAsBuffer(): Buffer;
    sliceInto(frb: ReadBuffer, size: number): void;
    static init(frb: ReadBuffer, buffer: Buffer): void;
    static slice(frb: ReadBuffer, buffer: Buffer, pos: number, len: number): void;
    static alloc(): ReadBuffer;
}
