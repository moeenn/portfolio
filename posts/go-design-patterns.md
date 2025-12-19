---
title: "Golang design patterns"
desc: "Design patterns are proven solution to common programming problems. Here are some common design patterns in Golang."
category: "Golang"
tags: ["Design Patterns"]
---

## Decorator Pattern

Pattern Type: Structure

```go
import (
	"fmt"
	"log"
)

type DataSource interface {
	WriteData(string)
	ReadData() string
}

// implements DataSource
type FileDatasource struct {
	content string
}

func (f *FileDatasource) WriteData(data string) {
	f.content += data
}

func (f FileDatasource) ReadData() string {
	return f.content
}

// implements DataSource
type DecoratedFileDatasource struct {
	file *FileDatasource
}

func (f *DecoratedFileDatasource) WriteData(data string) {
	log.Println("writing to file")
	f.file.content += data
}

func (f DecoratedFileDatasource) ReadData() string {
	log.Println("reading from file")
	return f.file.content
}

func main() {
	file := &FileDatasource{""}
	decoratedFile := DecoratedFileDatasource{file}

	decoratedFile.WriteData("Some content")
	fmt.Println(decoratedFile.ReadData())
}
```

## Facade Pattern

This pattern aims to simplify the interface of other entities.

```go
type Logger interface {
	Log(out io.Writer, level string, message []byte)
}

type RawLogger struct{}

func (l RawLogger) Log(out io.Writer, level string, message []byte) {
	fmt.Fprintf(out, "%s - %s\n", level, message)
}

type LoggerFacade struct {
	out      io.Writer
	instance Logger
}

func NewLogger(out io.Writer, instance Logger) *LoggerFacade {
	return &LoggerFacade{
		out:      out,
		instance: instance,
	}
}

func (l LoggerFacade) Info(message string) {
	l.instance.Log(l.out, "info", []byte(message))
}

func (l LoggerFacade) Warn(message string) {
	l.instance.Log(l.out, "warn", []byte(message))
}

func main() {
	logger := NewLogger(os.Stdout, &RawLogger{})
	logger.Info("Some random message")
	logger.Warn("Some warning")
}
```

## Observer pattern

Pattern Type: Behavioral

```go
type Message string

type Subscriber interface {
	GetId() int
	GetLastMessage() Message
	Update(Message)
}

type Publisher interface {
	Subscribe(Subscriber)
	Unsubscribe(Subscriber)
	Notify(Message)
}

type ExampleSubscriber struct {
	id          int
	lastMessage Message
}

func NewExampleSubscriber(id int) *ExampleSubscriber {
	return &ExampleSubscriber{
		id:          id,
		lastMessage: "",
	}
}

func (s ExampleSubscriber) GetId() int {
	return s.id
}

func (s ExampleSubscriber) GetLastMessage() Message {
	return s.lastMessage
}

func (s *ExampleSubscriber) Update(message Message) {
	s.lastMessage = message
	fmt.Printf("[%d] %s\n", s.id, message)
}

type ExamplePublisher struct {
	subscribers []Subscriber
}

func (p *ExamplePublisher) Subscribe(sub Subscriber) {
	p.subscribers = append(p.subscribers, sub)
}

func (p ExamplePublisher) findSubscriberById(id int) int {
	for i := 0; i < len(p.subscribers); i++ {
		if p.subscribers[i].GetId() == id {
			return i
		}
	}

	return -1
}

func (p *ExamplePublisher) Unsubscribe(sub Subscriber) {
	idx := p.findSubscriberById(sub.GetId())
	if idx == -1 {
		return
	}

	p.subscribers = append(p.subscribers[:idx], p.subscribers[idx+1:]...)
}

func (p *ExamplePublisher) Notify(message Message) {
	for _, sub := range p.subscribers {
		sub.Update(message)
	}
}

func main() {
	subOne := NewExampleSubscriber(1)
	subTwo := NewExampleSubscriber(2)

	pub := ExamplePublisher{}
	pub.Subscribe(subOne)
	pub.Subscribe(subTwo)

	pub.Notify("Hello there")
}
```

## Singleton Pattern

Pattern Type: Creation

```go
package singleton

import "sync"

type singleton map[string]string

var (
	once     sync.Once
	instance singleton
)

func New() singleton {
    // anonymous function will only be called once
	once.Do(func() {
		instance = make(map[string]string)
	})

	return instance
}
```

```go
store := singleton.New()
store["Pakistan"] = "Islamabad"
store["China"] = "Biejing"

storeTwo := singleton.New()
fmt.Println(storeTwo["Pakistan"]) // Islamabad
```

**Note**: Singleton pattern represents a global state and most of the time reduces testability.

## Strategy Pattern

Pattern Type: Behavioural

```go
type Location struct {
	Lat, Lng float64
}

func (l Location) ToString() string {
	return fmt.Sprintf("(%f, %f)", l.Lat, l.Lng)
}

type RouteStrategy interface {
	execute(start, end Location)
}

type WalkStrategy struct{}

func (w WalkStrategy) execute(start, end Location) {
	fmt.Printf("Walking from %s to %s\n", start.ToString(), end.ToString())
}

type DriveStrategy struct{}

func (d DriveStrategy) execute(start, end Location) {
	fmt.Printf("Driving from %s to %s\n", start.ToString(), end.ToString())
}

type RouteContext struct {
	strategy RouteStrategy
}

func NewRouteContext(strategy RouteStrategy) *RouteContext {
	return &RouteContext{strategy}
}

func (ctx *RouteContext) SetStrategy(strategy RouteStrategy) {
	ctx.strategy = strategy
}

func (ctx RouteContext) ExecuteStrategy(start, end Location) {
	ctx.strategy.execute(start, end)
}

func main() {
	driveStrategy := DriveStrategy{}
	ctx := NewRouteContext(driveStrategy)
	start := Location{30.44, 50.66}
	end := Location{70.31, 10.67}
	ctx.ExecuteStrategy(start, end)

	walkStrategy := WalkStrategy{}
	ctx.SetStrategy(walkStrategy)
	ctx.ExecuteStrategy(start, end)
}
```

## Todo

- Factory
- Builder
- Adapter
- Bridge
- Command
