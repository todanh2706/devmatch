import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Danh',
      description: 'Handsome man',
    },
    {
      id: randomUUID(),
      name: 'Vy',
      description: 'Beautiful girl',
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);

    if (!matchingProfile) {
      //   throw new NotFoundException(`Profile with ID ${id} not found.`);

      throw new Error(`Profile with ID ${id} not found.`);
    }

    return matchingProfile;
  }

  create(creatProfileDto: CreateProfileDto) {
    const createdProfile = {
      id: randomUUID(),
      ...creatProfileDto,
    };

    this.profiles.push(createdProfile);
    return createdProfile;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const matchingProfile = this.profiles.find(
      (existingProfile) => existingProfile.id === id,
    );

    if (!matchingProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }

    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;

    return matchingProfile;
  }

  remove(id: string): void {
    const matchingProfileIndex = this.profiles.findIndex(
      (existingProfile) => existingProfile.id === id,
    );

    if (matchingProfileIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }

    this.profiles.splice(matchingProfileIndex, 1);
  }
}
