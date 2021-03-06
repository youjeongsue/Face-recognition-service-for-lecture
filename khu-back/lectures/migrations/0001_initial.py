# Generated by Django 3.1 on 2020-08-16 06:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lecture_name', models.CharField(max_length=50)),
                ('credit', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=20)),
                ('department', models.CharField(max_length=30)),
                ('student_num', models.CharField(max_length=30)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=240)),
                ('value', models.CharField(max_length=10)),
                ('lecture_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lectures.lecture')),
            ],
        ),
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=20)),
                ('department', models.CharField(max_length=30)),
                ('is_deleted', models.BooleanField(default=False)),
                ('lectures', models.ManyToManyField(blank=True, to='lectures.Lecture')),
            ],
        ),
        migrations.AddField(
            model_name='lecture',
            name='students',
            field=models.ManyToManyField(blank=True, to='lectures.Student'),
        ),
    ]
